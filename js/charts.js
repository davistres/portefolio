document.addEventListener('DOMContentLoaded', function() {
  Chart.register(ChartDataLabels);

  // Labels complets pour le survol (tooltip)
  const fullCreativeLabels = [
    'UX/UI (Figma)',
    'Création/Retouche (Photoshop/Illustrator)',
    'Montage vidéo (Premiere Pro)',
    'Gestion de projets (Trello)',
    'Marketing/SEO (Google Ads/ Google Analytics)'
  ];

  const chartOptions3D = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    layout: {
      padding: 15
    },
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          color: '#666',
          font: {
            size: 10,
            family: "'Poppins', sans-serif"
          },
          padding: 8,
          boxWidth: 12,
          boxHeight: 12
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#666',
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return context.label + ': ' + context.parsed + '%';
          }
        }
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
          size: 11
        },
        formatter: function(value, context) {
          return context.chart.data.labels[context.dataIndex];
        },
        anchor: 'center',
        align: 'center',
        offset: 0,
        textAlign: 'center',
        clip: false
      }
    }
  };

  const chartOptionsPolar = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          color: '#666',
          font: {
            size: 10,
            family: "'Poppins', sans-serif"
          },
          padding: 8,
          boxWidth: 12,
          boxHeight: 12
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#666',
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        callbacks: {
          label: function(context) {
            // Utiliser le label complet si c'est le graphique créatif
            if (context.chart.canvas.id === 'creativeChart') {
              return fullCreativeLabels[context.dataIndex] + ': ' + context.parsed.r + '%';
            }
            return context.label + ': ' + context.parsed.r + '%';
          }
        }
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
          size: 11
        },
        formatter: function(value, context) {
          return context.chart.data.labels[context.dataIndex];
        },
        anchor: 'center',
        align: 'center',
        offset: 0,
        textAlign: 'center',
        clip: false
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          display: false
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  };

  const ctx1 = document.getElementById('expertiseChart');
  if (ctx1) {
    new Chart(ctx1, {
      type: 'doughnut',
      data: {
        labels: ['FRONT', 'BACK'],
        datasets: [{
          data: [62, 38],
          backgroundColor: [
            '#5B9BD5',
            '#ED7D31'
          ],
          borderWidth: 2,
          borderColor: '#fff',
          hoverOffset: 10
        }]
      },
      options: chartOptions3D
    });
  }

  const ctx2 = document.getElementById('frontChart');
  if (ctx2) {
    new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: [
          'HTML/CSS',
          'Tailwind',
          'Bootstrap',
          'JS / Vue / Alpine',
          'Vite.js',
          'React'
        ],
        datasets: [{
          data: [30, 20, 10, 25, 10, 5],
          backgroundColor: [
            '#5B9BD5',
            '#A5A5A5',
            '#FFC000',
            '#70AD47',
            '#264478',
            '#ED7D31'
          ],
          borderWidth: 2,
          borderColor: '#fff',
          hoverOffset: 4
        }]
      },
      options: chartOptions3D
    });
  }

  const ctx3 = document.getElementById('backChart');
  if (ctx3) {
    new Chart(ctx3, {
      type: 'doughnut',
      data: {
        labels: ['PHP', 'Laravel', 'MySQL', 'Git', 'Docker'],
        datasets: [{
          data: [30, 35, 15, 10, 10],
          backgroundColor: [
            '#5B9BD5',
            '#ED7D31',
            '#70AD47',
            '#A5A5A5',
            '#264478'
          ],
          borderWidth: 2,
          borderColor: '#fff',
          hoverOffset: 4
        }]
      },
      options: chartOptions3D
    });
  }

  const ctx4 = document.getElementById('creativeChart');
  if (ctx4) {
    new Chart(ctx4, {
      type: 'polarArea',
      data: {
        // Labels courts pour l'affichage sur le graphique
        labels: ['UX/UI', 'Création', 'Vidéo', 'Projets', 'Marketing'],
        datasets: [{
          data: [28, 20, 10, 22, 20],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)'
          ],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: chartOptionsPolar
    });
  }
});
