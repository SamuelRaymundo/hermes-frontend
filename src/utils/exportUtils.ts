import jsPDF from 'jspdf';
import type { ECharts, EChartsOption } from 'echarts';

interface GenericSeries {
    type?: string;
    label?: Record<string, unknown>;
    [key: string]: unknown;
}

export const downloadChartImage = (
    echartInstance: ECharts | null | undefined,
    isDark: boolean,
    date: string
) => {
    if (!echartInstance) return;

    const base64 = echartInstance.getDataURL({
        type: 'png',
        pixelRatio: 2,
        backgroundColor: isDark ? '#0B0E14' : '#ffffff'
    });

    const link = document.createElement('a');
    link.href = base64;
    link.download = `grafico-hermes-${date}.png`;
    link.click();
};

export const downloadChartPDF = (
    echartInstance: ECharts | null | undefined,
    finalOption: EChartsOption | null,
    includeText: boolean,
    lastAiMessage: string,
    date: string
) => {
    if (!echartInstance || !finalOption) return;

    const exportOptions: EChartsOption = {
        ...finalOption,
        backgroundColor: '#ffffff',
        title: finalOption.title ? {
            ...(finalOption.title as object),
            textStyle: { ...((finalOption.title as Record<string, unknown>).textStyle as object || {}), color: '#374151' }
        } : undefined,
        legend: finalOption.legend ? {
            ...(finalOption.legend as object),
            textStyle: { ...((finalOption.legend as Record<string, unknown>).textStyle as object || {}), color: '#374151' }
        } : undefined,

        series: Array.isArray(finalOption.series)
            ? (finalOption.series as GenericSeries[]).map((s) => {
                if (s.type === 'pie') {
                    return {
                        ...s,
                        label: {
                            ...(s.label || {}),
                            color: '#1f2937',
                            textBorderColor: '#ffffff',
                            textBorderWidth: 2
                        }
                    };
                }
                return s;
            }) as EChartsOption['series']
            : finalOption.series
    };

    echartInstance.setOption(exportOptions, true);
    const base64 = echartInstance.getDataURL({ type: 'png', pixelRatio: 3, backgroundColor: '#ffffff' });
    echartInstance.setOption(finalOption, true);

    const img = new Image();
    img.src = base64;
    img.onload = () => {
        const pdf = new jsPDF(includeText ? 'p' : 'l', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        pdf.setFontSize(16);
        pdf.setTextColor(40, 40, 40);
        pdf.text("Relatório de Análise - Hermes", 15, 15);
        pdf.setFontSize(10);
        pdf.text(`Data: ${date}`, 15, 22);

        const maxImgWidth = pageWidth - 30;
        const maxImgHeight = pageHeight - 40;

        let finalWidth = maxImgWidth;
        let finalHeight = (img.height * finalWidth) / img.width;

        if (finalHeight > maxImgHeight) {
            finalHeight = maxImgHeight;
            finalWidth = (img.width * finalHeight) / img.height;
        }

        const xOffset = (pageWidth - finalWidth) / 2;

        pdf.addImage(base64, 'PNG', xOffset, 30, finalWidth, finalHeight);

        if (includeText && lastAiMessage) {
            pdf.addPage();
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.text("Análise Detalhada", 15, 20);
            pdf.setFontSize(10);
            pdf.setFont("helvetica", "normal");

            const cleanText = lastAiMessage.replace(/[#*]/g, '').trim();
            const splitText = pdf.splitTextToSize(cleanText, pageWidth - 30);
            pdf.text(splitText, 15, 30);
        }

        pdf.save(`relatorio-hermes-${date}.pdf`);
    };
};