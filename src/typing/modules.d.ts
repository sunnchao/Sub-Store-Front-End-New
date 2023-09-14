declare namespace Modules {
  type SelectOption = {
    label: string;
    value: string;
  };

  type Param = {
    description: string;
  } & (
    | {
        dataType: "boolean";
        defaultValue: boolean;
      }
    | {
        dataType: "string";
        defaultValue: string;
      }
    | {
        dataType: "number";
        defaultValue: number;
      }
    | {
        dataType: "select";
        defaultValue: string;
        options?: SelectOption[];
      }
    | {
        dataType: "multiSelect";
        defaultValue: string[];
        options?: SelectOption[];
      }
  );
  type Params = Record<string, Param>;

  type ScriptInfo = {
    title: string;
    scope: Utils.Backend[];
    description?: string;
    author?: string;
    version?: string;
    update?: string;
    params?: Params;
    pageContent?: string;
  };

  type BackendInfo = {
    name: string;
    url: string;
  } & ScriptInfo;
}
