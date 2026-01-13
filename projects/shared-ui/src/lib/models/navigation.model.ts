export interface NavigationItem {
  label: string;
  route: string;
  icon?: any;
  children?: NavigationItem[];
}

export interface UserInfo {
  name: string;
  role: string;
  email: string;
}