import { Component, OnInit, ElementRef } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  private d3: D3;

  private svg: any;

  private width = 400;
  private height = 400;

  private radius = this.height / 2;

  private htmlElement: HTMLElement;

  private data = [
    {"label": "Category A", "value": 20},
    {"label": "Category B", "value": 50},
    {"label": "Category C", "value": 30},
    {"label": "Category D", "value": 20}
  ];

  constructor(private element: ElementRef, private d3Service: D3Service) {
    this.htmlElement = this.element.nativeElement;
    this.d3 = this.d3Service.getD3();
  }

  ngOnInit() {
    let self = this;

    if (this.htmlElement !== null) {
      this.svg = this.d3.select('#pie-chart').html('')
        .append('svg:svg')
        .data([this.data])
        .attr("width", this.width)
        .attr("height", this.height)
        .append("svg:g")
        .attr("transform", "translate(" + this.radius + "," + this.radius + ")");

      // let color = d3.scaleOrdinal(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);
      let color = this.d3.scaleOrdinal(this.d3.schemeCategory20c);

      let pie = this.d3.pie().value((d) => {
        return d['value'];
      });

      // declare an arc generator function
      let arc = this.d3.arc().outerRadius(this.radius).innerRadius(0);

      // select paths, use arc generator to draw
      let arcs = this.svg.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");

      arcs.append("svg:path")
        .attr("fill", (d, i) => {
          return color(i);
        })
        .attr("d", (d) => {
          // log the result of the arc generator to show how cool it is :)
          console.log(arc(d));
          return arc(d);
        });

      // add the text
      arcs.append("svg:text")
        .attr("transform", (d) => {
          d.innerRadius = 0;
          d.outerRadius = self.radius;
          return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle").text((d, i) => {
          return self.data[i].label;
        });

    }

  }

}
