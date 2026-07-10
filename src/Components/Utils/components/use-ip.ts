import { useEffect, useState } from "react";
import { gettext } from "@/Components/Language/index.ts";
import { OK } from "@/Components/Rest/http-status.ts";

type UseIpProps = {
  ip: string;
  isLoading: boolean;
  msg: string;
};
export const useIp = (type: 4 | 6): UseIpProps => {
  const [data, setData] = useState<UseIpProps>({
    ip: "",
    isLoading: true,
    msg: gettext("Loading..."),
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://ipv${type}.inn-studio.com/ip/?json`);
      await res
        .json()
        .catch(() => {
          setData({ ip: "", isLoading: false, msg: gettext("Not support") });
        })
        .then((ipData) => {
          if (ipData?.ip && res.status === OK) {
            setData({ ip: ipData.ip, isLoading: false, msg: "" });
            return;
          }
          setData({
            ip: "",
            isLoading: false,
            msg: gettext("Can not fetch IP"),
          });
        });
    };
    fetchData();
  }, [type]);
  return data;
};
