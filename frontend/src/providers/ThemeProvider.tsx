import { ConfigProvider, ThemeConfig, theme } from "antd";
import React, { PropsWithChildren, useEffect, useState } from "react";

export type ThemeType = "light" | "dark";

export interface IThemeProviderProps {
  theme: ThemeType;
}

export const ThemeProvider: React.FC<PropsWithChildren<IThemeProviderProps>> = (
  props
) => {
  const [antdTheme, setAntdTheme] = useState<ThemeConfig>({
    algorithm: theme.defaultAlgorithm,
  });

  useEffect(() => {
    // 配合 antd 樣式變換的速度
    document.body.style.transition = "all 0.2s";
  }, []);

  useEffect(() => {
    switch (props.theme) {
      case "light":
        setAntdTheme({
          algorithm: theme.defaultAlgorithm,
        });
        document.body.classList.remove("dark");
        document.body.style.backgroundColor = "rgb(248 250 252)";
        break;

      case "dark":
        setAntdTheme({
          algorithm: theme.darkAlgorithm,
        });
        document.body.classList.add("dark");
        document.body.style.backgroundColor = "rgb(23 23 23)";
        break;

      default:
        const expandCheck: never = props.theme;
        return expandCheck;
    }
  }, [props.theme]);

  return <ConfigProvider theme={antdTheme}>{props.children}</ConfigProvider>;
};
export default ThemeProvider;
