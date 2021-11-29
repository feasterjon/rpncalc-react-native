/*
Title: JRPNCalc
Author: Jonathan Feaster, JonFeaster.com
Date: 2021-10-26
*/

import { RPN } from './rpn.js';

class JRPNCalc extends RPN {
  constructor(expression, constants) {
    super();
    this.expression = expression;
    this.constants = constants;
  }

  // process constants

  procConstants(expression) {
    if (typeof this.constants !== 'undefined') {
      let values = Object.values(this.constants);
      for (let value of values) {
        expression = expression.replace(new RegExp(value.symbol, 'gi'), Function('\'use strict\';return (' + value.value + ')'));
      }
    }
    return expression;
  }

  // process functions

  procFunctions(expression) {
    // Exponentiation
    expression = expression.replace(/pow\(([^)]+)\)/gi, (match, $1) => {
      let params = $1.split(',', 2);
      return Math.pow(parseFloat(this.rpn(this.procConstants(params[0]))), parseFloat(this.rpn(this.procConstants(params[1]))));
    });
    // Square Root
    expression = expression.replace(/sqrt\(([^)]+)\)/gi, (match, $1) => {
      return Math.sqrt(parseFloat(this.rpn(this.procConstants($1))));
    });
    // N Root
    expression = expression.replace(/nrt\(([^)]+)\)/gi, (match, $1) => {
      let params = $1.split(',', 2);
      return Math.pow(parseFloat(this.rpn(this.procConstants(params[0]))), 1 / parseFloat(this.rpn(this.procConstants(params[1]))));
    });
    // Arcsine
    expression = expression.replace(/asin\(([^)]+)\)/gi, (match, $1) => {
      return Math.asin(parseFloat(this.rpn(this.procConstants($1))));
    });
    // Arccosine
    expression = expression.replace(/acos\(([^)]+)\)/gi, (match, $1) => {
      return Math.acos(parseFloat(this.rpn(this.procConstants($1))));
    });
    // Arctangent
    expression = expression.replace(/atan\(([^)]+)\)/gi, (match, $1) => {
      return Math.atan(parseFloat(this.rpn(this.procConstants($1))));
    });
    // Sine
    expression = expression.replace(/sin\(([^)]+)\)/gi, (match, $1) => {
      return Math.sin(parseFloat(this.rpn(this.procConstants($1))));
    });
    // Cosine
    expression = expression.replace(/cos\(([^)]+)\)/gi, (match, $1) => {
      return Math.cos(parseFloat(this.rpn(this.procConstants($1))));
    });
    // Tangent
    expression = expression.replace(/tan\(([^)]+)\)/gi, (match, $1) => {
      return Math.tan(parseFloat(this.rpn(this.procConstants($1))));
    });
    return expression;
  }
}

export { JRPNCalc };
