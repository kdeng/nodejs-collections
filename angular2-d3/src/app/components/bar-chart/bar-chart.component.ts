import { Component, ElementRef, OnInit } from '@angular/core';
import { D3, D3Service } from "d3-ng2-service";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  private d3: D3;

  private svg: any;


  private margin = {top: 20, right: 50, bottom: 30, left: 20};

  private width = 400 - this.margin.left - this.margin.right;
  private height = 300 - this.margin.top - this.margin.bottom;


  private htmlElement: HTMLElement;

  private data = [
    {month: 'Jan', A: 20, B: 5, C: 10},
    {month: 'Feb', A: 25, B: 10, C: 20}
  ];

  constructor(private element: ElementRef, private d3Service: D3Service) {
    this.htmlElement = this.element.nativeElement;
    this.d3 = this.d3Service.getD3();
  }

  ngOnInit() {
    let self = this;

    if (this.htmlElement) {

      let xData = ["A", "B", "C"];

      let x = this.d3.scaleBand().rangeRound([0, this.width]).padding(0.35);

      let y = this.d3.scaleLinear().rangeRound([this.height, 0]);

      let color = this.d3.scaleOrdinal(this.d3.schemeCategory20c);

      let xAxis = this.svg.axis()
        .scale(x)
        .orient("bottom");

      let svg = this.d3.select('#bar-chart').html('').append("svg:svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

      let dataIntermediate = xData.map((c) => {
        return self.data.map((d) => {
          return {x: d.month, y: d[c]};
        });
      });

      let dataStackLayout = this.d3.stack()
        .keys(xData)
        .order(this.d3.stackOrderNone)
        .offset(this.d3.stackOffsetNone)
        .apply(dataIntermediate);

      x.domain(dataStackLayout[0].map(function (d) {
        return d['x'];
      }));

      y.domain([
        0,
        this.d3.max(
          self.data,
          (d) => {
            return d['y0'] + d['y'];
          }
        )
      ]).nice();

      let layer = svg.selectAll(".stack")
        .data(dataStackLayout)
        .enter().append("g")
        .attr("class", "stack")
        .style("fill", function (d, i) {
          return color[i];
        });

      layer
        .selectAll("rect")
        .data((d) => {
          return d;
        })
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.x);
        })
        .attr("y", function (d) {
          return y(d.y + d.y0);
        })
        .attr("height", function (d) {
          return y(d.y0) - y(d.y + d.y0);
        })
        .attr("width", x.bandwidth());

      svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + this.height + ")")
        .call(xAxis);

    }
  }

}
