import { useEffect, useMemo, useState } from "react";
import { fetcher, server } from "src/config";
import { Cate, CategoryGroup } from "src/types/article";
import useSWR from "swr";

export function useCategories() {
  // const [categories, _] = useState<Cate[]>([] as Cate[]);
  const res = useSWR(`/api/category`, fetcher);

  return res;
}
export function useCateGroup() {
  // const [cateGroup, __] = useState<CategoryGroup[]>([] as CategoryGroup[]);
  const res = useSWR(`/api/article/categoryGroup`, fetcher);
  return res;
}

export function formatCate(cates: Cate[], group: CategoryGroup[]) {
  if (cates && cates.length) {
    for (let cate of cates) {
      const item = group.find((i) => i.id === cate.id);
      if (item) {
        cate.count = item.count;
      }
      if (cate.children && cate.children.length) {
        formatCate(cate.children, group);
      }
    }
  }
}

export function useCateData() {
  const { error, data: categories } = useCategories();
  const { error: err, data: cateGroup } = useCateGroup();
  formatCate(categories || [], cateGroup || []);

  return { categories, cateGroup };
}
