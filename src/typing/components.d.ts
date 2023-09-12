declare namespace Components {
  type SubType = "sub" | "collection";
  
  type PreviewInfo = {
    name: string;
    type: SubType;
  };
  type PreviewMultiplePlatform = (info: PreviewInfo) => void;
}
