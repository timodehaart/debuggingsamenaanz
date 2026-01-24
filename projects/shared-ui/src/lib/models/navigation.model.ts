export interface NavigationItem {
  label: string;
  route: string;
  icon?: string;
  children?: NavigationItem[];
  isProject?: boolean;
  isExpanded?: boolean;
}

export interface UserInfo {
  name: string;
  role: string;
  email: string;
}