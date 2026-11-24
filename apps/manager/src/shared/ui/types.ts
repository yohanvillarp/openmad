export type ThemeColor = 'red' | 'blue' | 'green' | 'white' | 'black';

export type UiVariant = 'cyber' | 'minimal' | 'tactical';

export interface ThemeConfig {
  color: ThemeColor;
  variant: UiVariant;
}
