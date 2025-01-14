// Referencias a los elementos del DOM
const imageCountSelector = document.getElementById("imageCount");
const imageGallery = document.getElementById("imageGallery");
const dataSetSelector = document.getElementById("dataSetSelector");
const barChartContainer = document.getElementById("barChart");
const donutChartContainer = document.getElementById("donutChart");

// Conjuntos de datos
const dataSets = {
  data1: [10, 20, 30, 40, 50],
  data2: [5, 15, 25, 35, 45],
};

// Función para generar imágenes
function generateImages(count) {
  imageGallery.innerHTML = ""; // Limpiar galería
  for (let i = 0; i < count; i++) {
    const img = document.createElement("img");
    img.src = `https://picsum.photos/200/200?random=${Date.now() + i}`; // Cache-busting
    img.alt = `Imagen ${i + 1}`;
    img.className = "img-fluid rounded mx-auto d-block";
    img.loading = "lazy"; // Lazy loading
    const col = document.createElement("div");
    col.className = "col-6 col-md-3";
    col.appendChild(img);
    imageGallery.appendChild(col);
  }
}

// Función para renderizar gráficos
function renderCharts(data) {
  const barChart = new ApexCharts(barChartContainer, {
    chart: {
      type: "bar",
    },
    series: [{ name: "Valores", data }],
    xaxis: {
      categories: data.map((_, i) => `Item ${i + 1}`),
    },
  });

  const donutChart = new ApexCharts(donutChartContainer, {
    chart: {
      type: "donut",
    },
    series: data,
    labels: data.map((_, i) => `Item ${i + 1}`),
  });

  barChart.render();
  donutChart.render();
}

// Eventos
imageCountSelector.addEventListener("change", (e) => {
  generateImages(parseInt(e.target.value, 10));
});

dataSetSelector.addEventListener("change", (e) => {
  const selectedData = dataSets[e.target.value];
  renderCharts(selectedData);
});

// Inicializar
generateImages(5); // Por defecto 5 imágenes
renderCharts(dataSets["data1"]); // Gráficos iniciales
