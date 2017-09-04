import {Line} from 'vue-chartjs'//按需导入，这里只用到折线图
//import {Line, Bar, Radar, Pie, Polar} from 'vue-chartjs'
function barChar (barData) {
  let barC = $(".barChar")
  let barChar = new Chart(barC, {
      type: 'bar',
      data: {
          labels: ['南京','杭州','中山','深圳','东莞','北京','重庆','大连','哈尔滨','佛山','武汉','上海','潮州','揭阳','肇庆','海口','石家庄','青岛','黑龙江'],
          datasets: [{
              label: '游客来源',
              data: [54,160,78,120,69,83,110,190,209,330,70,159,166,89,60,89,77,130,144],
              backgroundColor: '#D6ECFB',
              borderColor: '#36A2EB',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  },
                  gridLines:{
                    display:false
                  }
              }],
               xAxes: [{
                  gridLines:{
                    display:false
                  },
              }]
          }
      }
  });
}
function lineChar (barData) {
  var lineC= $(".lineChar");
  var lineChar = new Chart(lineC, {
      type: 'line',
      data: {
          labels:barData.labels,
          datasets: barData.datasets
      },
      options: {
          scales: {
              yAxes: [{
                  gridLines:{
                    display:false
                  },
                  ticks: {
                    beginAtZero:true
                }
              }],
              xAxes: [{
                  gridLines:{
                    display:false
                  },
              }]
          }
      }
  });
}

function radarChar (barData) {
    var radarC= $(".radarChar")
    var radarChar = new Chart(radarC, {
        type: 'radar',
        data: {
            labels: ['OA','PMS','CMS','Cloud','IM','BBS'],
            datasets: [
            // {
            //     label: '111',
            //     data: [60,88,113,120,100,130],
            //     backgroundColor:['rgba(255, 99, 132, 0.2)'],
            //     borderColor: ['rgba(255,99,132,1)'],
            //     borderWidth: 2,
            // },
            {
                label: '子站访问统计',
                data: [134,103,89,100,120,140],
                backgroundColor:['rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(54, 162, 235, 1)'],
                borderWidth: 2,
            }]
        },
        options: {
            scale: {
            // Hides the scale
            display: true
        }
        }
    });
}
function pieChar (barData) {
    var pieC = $(".pieChar");
    var pieChar = new Chart(pieC, {
        type: 'pie',
        data: {
            labels: ['OA','PMS','CMS','Cloud'],
            datasets: [
            {
                data: [700,600,200,400],
                backgroundColor:['rgba(255, 99, 132, 0.4)','rgba(255, 206, 86, 0.4)','rgba(15, 99, 222, 0.4)','rgba(100, 20, 84, 0.4)'],
                // borderColor: ['rgba(255,99,132,0.8)','rgba(255, 206, 86, 0.8)','rgba(15, 99, 222, 0.6)','rgba(100, 20, 84, 0.6)'],
                borderWidth: 0,
            }]
        },
        options: {
           cutoutPercentage:40
        }
    });
}

function polarChar (barData) {
    var polarC = $(".polarChar")
    var polarChar = new Chart(polarC, {
        type: 'polarArea',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
              label: '. of Votes',
              data: [30,120,200,60,40,100],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  '#ffcE56',
                  '#4bc0C0',
                  '#9966FF',
                  '#ff9F40'
              ],
              borderWidth: 1
          }]
        },
        options: {
           animation:{
              animateRotate:true,
              animateScale:true
           }
        }
    });
}

export default{
  barChar,
  lineChar,
  radarChar,
  pieChar,
  polarChar
};