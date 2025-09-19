import { useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { guList, dongList, arrayList } from '../data/data';

export default function useUrlQuery(filters, page, setters, opts = {}) {
  const {
    defaults = { order: 'DEAL_DATE', page: 1 },
    pushOnPageChange = true,
    replaceOnFilterChange = true,
  } = opts;

  const {
    setSelectedGu,
    setFilteredDong,
    setSelectedDong,
    setSelectedApt,
    setSelectedArea,
    setSelectedOrderType,
    handleStartDate,
    handleEndDate,
    handleDoubt,
    currentReliability,
    setPage,
  } = setters;

  const nav = useNavigate();
  const { search } = useLocation();
  const prev = useRef({ query: '', page });

  useEffect(() => {
    let effectiveSearch = search;
    if (!effectiveSearch) {
      const saved = sessionStorage.getItem('listSearch');
      if (saved) {
        effectiveSearch = saved;
        // URL에도 반영해서 사용자가 돌아왔을 때 동일한 상태로 보이도록
        nav({ search: saved }, { replace: true });
      }
    }

    if (!effectiveSearch) return;

    const q = new URLSearchParams(effectiveSearch);
    const parsed = {
      order: q.get('order') || defaults.order,
      gu: q.get('gu') || undefined,
      dong: q.get('dong') || undefined,
      apt: q.get('apt') || undefined,
      area: q.get('area') || undefined,
      from: q.get('from') || undefined,
      to: q.get('to') || undefined,
      rel: q.get('rel') || 'ALL',
      page: q.get('page') ? Number(q.get('page')) : defaults.page,
    };

    if (parsed.gu) {
      const guObj = guList.find((g) => g.name === parsed.gu) || guList[0];
      console.log(parsed.gu, guObj);
      setSelectedGu(guObj);

      const dongsOfGu = dongList.filter((d) => d.guNum === guObj.num);
      setFilteredDong(dongsOfGu);

      if (parsed.dong) {
        const dongObj =
          dongsOfGu.find((d) => d.name === parsed.dong) || dongsOfGu[0];
        setSelectedDong(dongObj);
      }
    }

    if (parsed.order) {
      const ord =
        arrayList.find(
          (o) => o.eng === parsed.order || o.inorder === parsed.order
        ) || arrayList[0];
      setSelectedOrderType(ord);
    }

    if (parsed.apt) setSelectedApt({ apartmentName: parsed.apt });
    if (parsed.area) setSelectedArea({ areaForExclusiveUse: parsed.area });

    if (parsed.from) handleStartDate({ target: { value: parsed.from } });
    if (parsed.to) handleEndDate({ target: { value: parsed.to } });

    if (parsed.rel && parsed.rel !== currentReliability) {
      handleDoubt();
    }

    if (!Number.isNaN(parsed.page)) setPage(parsed.page);
  }, []);

  const query = useMemo(() => {
    const q = new URLSearchParams();
    const put = (k, v, isDefault = false) => {
      if (v === undefined || v === null || v === '') return;
      if (isDefault) return;
      q.set(k, String(v));
    };

    put('gu', filters.gu);
    put('dong', filters.dong);
    put('apt', filters.apt);
    put('area', filters.area);
    put('order', filters.order, filters.order === defaults.order);
    put('from', filters.from);
    put('to', filters.to);
    put('rel', filters.rel);
    put('page', page, page === defaults.page);

    return q.toString();
  }, [filters, page, defaults.order, defaults.page]);

  useEffect(() => {
    const nextSearch = query ? `?${query}` : '';
    const prevQuery = prev.current.query;
    const prevPage = prev.current.page;

    const pageChanged = page !== prevPage;
    const onlyPageChanged =
      pageChanged && stripPage(prevQuery) === stripPage(query);

    if (pushOnPageChange && onlyPageChanged) {
      nav({ search: nextSearch }, { replace: false });
    } else {
      nav({ search: nextSearch }, { replace: replaceOnFilterChange });
    }

    prev.current = { query, page };
    sessionStorage.setItem('listSearch', nextSearch);
  }, [query, page, nav]);

  function stripPage(qs) {
    if (!qs) return '';
    const u = new URLSearchParams(qs);
    u.delete('page');
    return u.toString();
  }
}
