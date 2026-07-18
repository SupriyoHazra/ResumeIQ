import api from "../../services/api";

export default function DownloadReportCard({ data }) {
  async function downloadReport() {
    try {
      const response = await api.post(
        "/download-report",
        { data },
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = "ResumeIQ_Report.pdf";

      document.body.appendChild(link);
      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error(err);
      alert("Unable to generate PDF.");
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        📄 Export Report
      </h2>

      <button
        onClick={downloadReport}
        className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-bold"
      >
        Download PDF Report
      </button>

    </div>
  );
}