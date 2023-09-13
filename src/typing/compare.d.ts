declare namespace Compare {
  type NodeInfo = {
    name: string;
    server: string;
    port: number;
    id: number;
    "skip-cert-verify"?: boolean;
    tfo?: boolean;
    udp?: boolean;
    type:
      | "trojan"
      | "ss"
      | "socks5"
      | "http"
      | "shadowsocks"
      | "vmess"
      | "custom";
  };
  type NodeInfos = NodeInfo[];

  type Data = {
    original: NodeInfos;
    processed: NodeInfos;
  };

  type IpApi = {
    shareUrl: string;
    info: {
      query: string;
      status: string;
      continent: string;
      continentCode: string;
      country: string;
      countryCode: string;
      region: string;
      regionName: string;
      city: string;
      district: string;
      zip: string;
      lat: number;
      lon: number;
      timezone: string;
      offset: number;
      currency: string;
      isp: string;
      org: string;
      as: string;
      asname: string;
      mobile: boolean;
      proxy: boolean;
      hosting: boolean;
    };
  };
}
