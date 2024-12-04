export const RenderIf = (
  { children, isTrue }: { children: any; isTrue: boolean },
) => {
  return isTrue ? children : null;
}
