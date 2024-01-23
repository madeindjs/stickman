import type { Accessor } from "solid-js";

export function useSVGExporter(svg: SVGSVGElement, filename: Accessor<string> = () => "stickman.svg") {
  return () => {
    const svgData = svg.outerHTML;
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = filename();
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
}
