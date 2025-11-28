document.addEventListener("DOMContentLoaded", function () {
  // Configurações globais para reduzir repetição e peso
  Chart.defaults.font.family = "'Nunito', sans-serif";
  Chart.defaults.color = "#A0AEC0";
  Chart.defaults.borderColor = "rgba(255, 255, 255, 0.05)";
  Chart.defaults.maintainAspectRatio = false; // Importante para responsividade

  const colorPrimary = "#B165FB";

  // Função de criação de gráficos sob demanda (Lazy Load)
  const createChart = (id, type, data, options) => {
    const canvas = document.getElementById(id);
    if (!canvas) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            new Chart(canvas, {
              type: type,
              data: data,
              options: {
                responsive: true,
                animation: { duration: 1000 },
                plugins: { legend: { display: false } },
                ...options,
              },
            });
            observer.unobserve(canvas); // Para de observar após carregar
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);
  };

  // 1. Gráfico Operacional (Linha)
  const ctxOp = document.createElement("canvas").getContext("2d");
  const gradientOp = ctxOp.createLinearGradient(0, 0, 0, 300);
  gradientOp.addColorStop(0, "rgba(177, 101, 251, 0.5)");
  gradientOp.addColorStop(1, "rgba(177, 101, 251, 0.0)");

  createChart(
    "deliveriesChart",
    "line",
    {
      labels: ["08h", "10h", "12h", "14h", "16h"],
      datasets: [
        {
          label: "Entregas",
          data: [12, 25, 28, 42, 45],
          borderColor: colorPrimary,
          backgroundColor: gradientOp,
          borderWidth: 2,
          fill: true,
          pointBackgroundColor: "#fff",
          tension: 0.4,
        },
      ],
    },
    {
      scales: { x: { grid: { display: false } } },
    }
  );

  // 2. Gráfico Tático (Barras Horizontais)
  createChart(
    "tacticalChart",
    "bar",
    {
      labels: ["Caminhão 01", "Caminhão 03", "Caminhão 02"],
      datasets: [
        {
          label: "Eficiência (%)",
          data: [95, 90, 88],
          backgroundColor: [
            colorPrimary,
            "rgba(177, 101, 251, 0.6)",
            "rgba(177, 101, 251, 0.3)",
          ],
          borderRadius: 4,
          barThickness: 25,
        },
      ],
    },
    {
      indexAxis: "y",
      scales: { x: { max: 100 }, y: { grid: { display: false } } },
    }
  );

  // 3. Gráfico Estratégico (Barras Verticais)
  createChart(
    "demandChart",
    "bar",
    {
      labels: ["Sudeste", "Sul", "Nordeste"],
      datasets: [
        {
          label: "Volume",
          data: [15000, 12000, 8000],
          backgroundColor: [
            colorPrimary,
            "rgba(177, 101, 251, 0.6)",
            "rgba(177, 101, 251, 0.3)",
          ],
          borderRadius: 6,
        },
      ],
    },
    {
      scales: { x: { grid: { display: false } } },
    }
  );
});
