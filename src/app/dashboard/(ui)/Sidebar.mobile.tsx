import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { SidebarProps, findKey, typeMap, types } from "./Sidebar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Switch } from "@/shared/ui/Switch";
import UploadFileSidebar from "./UploadFileSidebar";
import DeleteBtn from "./DeleteBtn";
import VStack from "@/shared/ui/VStack";
import styles from '../dashboard.module.css'
import {
  GestureSpringProvider,
  useGestureSpringProvider,
} from "@/components/GestureSpringProvider";
import { Spinner } from "@/shared/ui/Spinner";
import HStack from "@/shared/ui/HStack";

const SidebarMobile = memo(function SidebarMobile({
  setIsLoading,
  deleteFiles,
}: SidebarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const pathname = usePathname();
  const { gesture, spring } = useGestureSpringProvider();
  const [{ x, opacity, display }, api] = spring!.useSpring(() => ({
    x: -320,
    opacity: 0,
    display: 'none'
  }));

  const closeSidebar = useCallback(() => {
    api.start({
      x: -320,
      opacity: 0,
      display: 'none',
      immediate: false,
      config: spring!.config.gentle,
      onResolve(ctx) {
        if (ctx.finished) {
          setIsOpen(false)
        }
      }
    });
  }, [api, spring]);

  const openSidebar = useCallback(() => {
    api.start({
      x: -60,
      opacity: 1,
      display: 'block',
      immediate: false,
      config: spring!.config.gentle,
      onResolve(ctx) {
        if (ctx.finished) {
          setIsOpen(true)
        }
      }
    });
  }, [api, spring]);

  const bind = gesture!.useDrag(
    ({ last, cancel, movement: [mx], velocity: [vx], direction: [dx] }) => {
      if (mx > 10) cancel();
      if (last) {
        if (mx < -70 || (dx < 0 && vx > 0.7)) {
          closeSidebar();
        } else {
          openSidebar();
        }
      } else {
        api.start({
          x: mx - 60,
          immediate: false,
        });
      }
    },
    {
      // from: [0, x.get()],
      rubberband: true,
      bounds: { right: 0 },
      filterTaps: true,
      axis: 'x',
    }
  );

  useEffect(() => {
    setIsLoading?.(false);
  }, [searchParams, setIsLoading]);

  const onValueChange = useCallback(
    (type: (typeof types)[number]) => {
      const upd = typeMap[type] || "all";
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set("type", upd);
      setIsLoading?.(true);
      router.push(pathname + "?" + current.toString());
    },
    [pathname, router, searchParams, setIsLoading]
  );
  const Animated = useMemo(() => spring!.a.div, [spring]);

  return (
    <>
      <div className="w-5 bg-zinc-100" />
      <Animated style={{opacity, display}} className={'w-full fixed z-10 bg-black/40 ' + styles.fullheight} onClick={closeSidebar} /> 
      <Animated
        className={"select-none z-30 fixed flex w-[340px] pl-[60px] bg-cyan-950/95 text-slate-100 pt-2 touch-none " + styles.fullheight}
        style={{
          x: x,
        }}
        {...bind()}
      >
        <VStack className="grow">
          <Switch
            className="w-full [&>button]:basis-1/3"
            current={findKey(searchParams.get("type")) ?? "All"}
            values={types}
            onValueChange={onValueChange}
          />
          <UploadFileSidebar />
          <DeleteBtn deleteSelected={deleteFiles} />
        </VStack>
        <HStack className="items-center w-5 justify-center" onClick={!isOpen ? openSidebar : closeSidebar}>
          <div className="bg-slate-500 rounded-full h-10 w-1"/>
        </HStack>
      </Animated>
      </>
  );
});

const ValidatedSidebar = memo(function ValidatedSidebar(props: SidebarProps) {
  const { isMounted } = useGestureSpringProvider();
  if (!isMounted) return <Spinner />;

  return <SidebarMobile {...props} />;
});

export default memo(function SidebarMobileDynamic(props: SidebarProps) {
  return (
    <GestureSpringProvider>
      <ValidatedSidebar {...props} />
    </GestureSpringProvider>
  );
});
