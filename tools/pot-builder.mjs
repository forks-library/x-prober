import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";

const GETTEXT_REG =
  /gettext\s*\(\s*(["'`])((?:(?!\1)[^\\]|\\.)*)\1\s*(?:,\s*(?:(["'`])((?:(?!\3)[^\\]|\\.)*)\3)?)?\s*\)/gms;

export class PotBuilder {
  potPath = "";
  sourceDir = "";
  entries = {};
  filePaths = [];

  constructor({ potPath, sourceDir }) {
    this.potPath = potPath;
    this.sourceDir = sourceDir;
  }

  build() {
    this.filePaths = []; // 清空历史，防止重复调用时叠加
    this.fetchDirOrFile(this.sourceDir);

    for (const path of this.filePaths) {
      this.buildEntries(path);
    }
    this.buildPotFile();
  }

  buildEntries(path) {
    const code = readFileSync(path, "utf8");

    for (const match of code.matchAll(GETTEXT_REG)) {
      const [, , msgid] = match;
      const msgctxt = match[4] || "";

      const cacheKey = `${msgid}____${msgctxt}`;
      if (this.entries[cacheKey]) {
        continue;
      }

      // 组装 entry，确保没有多余的空行
      const lines = [];
      if (msgctxt) {
        lines.push(`msgctxt ${JSON.stringify(msgctxt)}`);
      }
      lines.push(`msgid ${JSON.stringify(msgid)}`);
      lines.push('msgstr ""');

      this.entries[cacheKey] = lines.join("\n");
    }
  }

  buildPotFile() {
    const headers = [
      "#, fuzzy",
      'msgid ""',
      'msgstr ""',
      '"Project-Id-Version: \\n"',
      '"POT-Creation-Date: \\n"',
      '"PO-Revision-Date: \\n"',
      '"Last-Translator: Km.Van\\n"',
      '"Language-Team: INN STUDIO\\n"',
      '"MIME-Version: 1.0\\n"',
      '"Content-Type: text/plain; charset=UTF-8\\n"',
      '"Content-Transfer-Encoding: 8bit\\n"',
      '"X-Generator: Poedit 3.0.1\\n"',
      '"X-Poedit-Basepath: ../src\\n"',
      '"Plural-Forms: nplurals=2; plural=(n != 1);\\n"',
      '"X-Poedit-SourceCharset: UTF-8\\n"',
      '"X-Poedit-KeywordsList: gettext\\n"',
    ].join("\n");

    const content = Object.values(this.entries).join("\n\n");
    const toWriteData = `${headers}\n\n${content}\n`; // 标准文件末尾留一空行

    writeFileSync(this.potPath, toWriteData, "utf8");
  }

  fetchDirOrFile(filePathOrDir) {
    try {
      const stat = statSync(filePathOrDir);

      if (stat.isDirectory()) {
        const entries = readdirSync(filePathOrDir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = join(filePathOrDir, entry.name);
          if (entry.isDirectory()) {
            this.fetchDirOrFile(fullPath);
          } else if (
            entry.isFile() &&
            [".ts", ".tsx"].includes(extname(entry.name))
          ) {
            this.filePaths.push(fullPath);
          }
        }
      } else if (
        stat.isFile() &&
        [".ts", ".tsx"].includes(extname(filePathOrDir))
      ) {
        this.filePaths.push(filePathOrDir);
      }
    } catch (err) {
      console.error(`无法读取路径: ${filePathOrDir}`, err);
    }
  }
}
