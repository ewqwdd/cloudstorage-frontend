"use client";
import { FileEntity } from "@/entity/File/types/file.type";
import FileComp from "@/entity/File/ui/File";
import { useScreen } from "@/shared/hooks/useScreen";
import { useTrhrothling } from "@/shared/hooks/useThrothling";
import HStack from "@/shared/ui/HStack";
import { Spinner } from "@/shared/ui/Spinner";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MouseEvent } from "react";

type setSelectedType = number[] | ((selected: number[]) => number[]);
interface FileListProps {
  files: FileEntity[];
  selected?: number[];
  setSelected?: (nums: setSelectedType) => void;
  isLoading?: boolean;
  isMobile?: boolean
}

interface Cords {
  start?: {
    x: number;
    y: number;
  };
  end?: {
    x: number;
    y: number;
  };
}
const fileH = 144;
const empty = {};
const emptyArr: number[] = []

const perRowMap: Record<number, number> = {
  1400: 10,
  1024: 8,
  768: 5,
  520: 3,
  360: 2,
  0: 1
}

export default function FileList({
  files,
  selected,
  setSelected,
  isLoading,
  isMobile
}: FileListProps) {
  const [cords, setCords] = useState<Cords>({});
  const {width} = useScreen()
  const zone = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  console.log(cords)
  const perRow = useMemo(() => perRowMap[Number(Object.keys(perRowMap).sort((a, b) => Number(b) - Number(a)).find(elem => width > Number(elem)))], [width])
  const generateOnClick = useCallback(
    (index: number) => {
      return (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!setSelected) return;
        if (!e.shiftKey && !e.ctrlKey) return setSelected([index]);
        if (e.shiftKey)
          return setSelected((prev) => {
            if (!prev.length) return [index];
            const min = Math.min(...prev);
            if (min <= index) {
              const arr = new Array(Math.abs(min - index) + 1).fill(0);
              return [...arr.map((elem, ind) => ind + min)];
            } else {
              const arr = new Array(Math.abs(min - index)).fill(0);
              return [...arr.map((elem, ind) => ind + index), ...prev];
            }
          });
        return setSelected((prev) => [...prev, index]);
      };
    },
    [setSelected]
  );
  const onClickFuncs = useMemo(
    () => files.map((elem, index) => generateOnClick(index)),
    [files, generateOnClick]
  );
  const clickOutside = useCallback(() => {
    if (cords.end && cords.start) return;
    if (selected?.length) setSelected?.(emptyArr);
  }, [cords, setSelected, selected]);

  useEffect(() => {
    if (isMobile) return
    const node = zone.current;
    const func = (e: globalThis.MouseEvent) => {
      if (!setSelected) return;
      if (e.buttons === 1) {
        if (cords.start) {
          setCords({
            ...cords,
            end: {
              x: e.x,
              y: e.y,
            },
          });
        } else {
          setCords({
            start: {
              x: e.x,
              y: e.y,
            },
            end: {
              x: e.x,
              y: e.y,
            },
          });
        }
      } else {
        setCords(empty);
      }
    };
    node?.addEventListener("mousemove", func);

    return () => {
      node?.removeEventListener("mousemove", func);
    };
  }, [cords, setSelected, isMobile]);

  const selecter = useCallback(() => {
    if (!cords.start || !cords.end) return;
    const fileW = Number(zone.current?.offsetWidth) / perRow - 2;
    const startH =
      (cords.start?.x < cords.end?.x ? cords.start.x : cords.end.x) -
      Number(zone.current?.offsetLeft);
    const startHInd =
      Math.ceil((startH - Math.round(startH / fileW) * 2) / fileW) - 1;
    const endH =
      (cords.start?.x > cords.end?.x ? cords.start.x : cords.end.x) -
      Number(zone.current?.offsetLeft);
    const endHInd =
      Math.ceil((endH - Math.round(endH / fileW) * 2) / fileW) - 1;

    const startV =
      (cords.start?.y < cords.end?.y ? cords.start.y : cords.end.y) -
      Number(zone.current?.offsetTop);
    const startVInd =
      Math.ceil((startV - Math.round(startV / fileH) * 2) / fileH) - 1;
    const endV =
      (cords.start?.y > cords.end?.y ? cords.start.y : cords.end.y) -
      Number(zone.current?.offsetTop);
    const endVInd =
      Math.ceil((endV - Math.round(endV / fileH) * 2) / fileH) - 1;

    const arr = new Array(endVInd - startVInd + 1).fill(0);
    const selected = arr.map((elem, index) =>
      new Array(endHInd - startHInd + 1)
        .fill(0)
        .map(
          (elem, inIndex) => (index + startVInd) * perRow + inIndex + startHInd
        )
    );

    const flatted = selected.flat(1);
    const filtered = flatted.filter(elem => elem<files.length)
    if (filtered.length) setSelected?.(filtered);
  }, [cords, perRow, files, setSelected]);

  const optimizedSelecter = useTrhrothling(selecter, 100);

  useEffect(() => {
    optimizedSelecter({});
  }, [cords, perRow, optimizedSelecter]);

  return (
    <div
      ref={zone}
      className={"grid bg-zinc-100 grow gap-[2px] relative overflow-y-auto select-none place-content-start"}
      onClick={clickOutside}
      style={{
        gridTemplateColumns: `repeat(${perRow}, 1fr)`,
        pointerEvents: isLoading ? 'none' : 'all'
      }}
    >
      <div
        className="absolute bg-cyan-700/60 z-20 border-cyan-600/80 rounded-sm"
        style={{
          left:
            Number(cords.start?.x) < Number(cords.end?.x)
              ? Number(cords.start?.x) - Number(zone.current?.offsetLeft)
              : Number(cords.end?.x) - Number(zone.current?.offsetLeft),
          top:
            Number(cords.start?.y) < Number(cords.end?.y)
              ? Number(cords.start?.y) - Number(zone.current?.offsetTop)
              : Number(cords.end?.y) - Number(zone.current?.offsetTop),
          width: cords.end
            ? Number(cords.start?.x) < Number(cords.end?.x)
              ? Number(cords.end?.x) - Number(cords.start?.x)
              : Number(cords.start?.x) - Number(cords.end?.x)
            : 0,
          height: cords.end
            ? Number(cords.start?.y) < Number(cords.end?.y)
              ? Number(cords.end?.y) - Number(cords.start?.y)
              : Number(cords.start?.y) - Number(cords.end?.y)
            : 0,
            borderWidth: cords.end && cords.start ? 2 : 0
        }}
      />
      {files.map((elem, index) => (
        <FileComp
          deleted={searchParams.get("type") === "trash"}
          isActive={selected?.includes(index)}
          onClick={onClickFuncs[index]}
          file={elem}
          key={elem.id}
          className="h-36"
        />
      ))}
      {isLoading && (
        <HStack className="justify-center items-center w-full h-full bg-black/25 absolute top-0 left-0">
          <Spinner className="w-16 h-16" />
        </HStack>
      )}
    </div>
  );
}
