export type ViewInfo = Readonly<{
  title?: string;
  icon?: string;
}>;

export type ViewInfoMap = Record<string, ViewInfo | undefined>;

const views: ViewInfoMap = {
  '/groceries': { icon: 'la la-globe', title: 'Groceries' },
};

export default views;
