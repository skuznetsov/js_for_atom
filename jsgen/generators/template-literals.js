"use strict";

module.exports = {
  TaggedTemplateExpression: TaggedTemplateExpression,
  TemplateElement: TemplateElement,
  TemplateLiteral: TemplateLiteral
};

function TaggedTemplateExpression(node) {
  this.print(node.tag, node);
  this.print(node.quasi, node);
}

function TemplateElement(node) {
  this._push(node.value.raw);
}

function TemplateLiteral(node) {
  this.push("`");

  var quasis = node.quasis;

  for (var i = 0; i < quasis.length; i++) {
    this.print(quasis[i], node);

    if (i + 1 < quasis.length) {
      this._push("${ ");
      this.print(node.expressions[i], node);
      this.push(" }");
    }
  }

  this._push("`");
}
