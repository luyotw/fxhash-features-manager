class FxhashFeaturesManger {
  constructor() {
    this.features = []
  }

  addFeature(feature) {
    if (!(feature instanceof FxhashFeature)) {
      this.log('Warning: parameter #1 of addFeature() needs to be an instance of "FxhashFeature"')
    }
    this.features.push(feature)
    return this
  }

  format() {
    let output = {}
    for (let i in this.features) {
      let feature = this.features[i]
      output[feature.getName()] = feature.getText()
    }
    return output
  }
  
  log(msg) {
    console.log(msg)
  }
}

class FxhashFeature {
  constructor(name) {
    this.name = name
    this.options = []
    this.picked = null
  }

  addOption(text, value, rate) {
    this.options[text] = {
      text: text,
      value: value,
      rate: rate
    }
    return this
  }
  
  debug(text) {
    this.picked = this.options[text]
    this.log('Debugging: "' + this.name + '" is "' + this.getText() + '".')
  }

  pickOne() {
    if (this.picked !== null) {
      return
    }

    // check if the sum of the rates is 100%
    if (!this.checkRates()) {
      this.log('Warning: the sum of the rates of all options of "' + this.name + '" is not 100%')
    }

    let rand = this.random()
    let cumm = 0
    for (let text in this.options) {
      cumm += this.options[text]['rate']
      if (rand < cumm) {
        this.picked = this.options[text]
        return
      }
    }
  }

  checkRates() {
    let sum = 0
    for (let i in this.options) {
      sum += this.options[i]['rate']
    }
    sum = sum.toFixed(4)
    return 1 == sum
  }

  random() {
    return fxrand()
  }

  getName() {
    return this.name
  }

  getValue() {
    if (null === this.picked) {
      this.pickOne()
    }
    return this.picked['value']
  }

  getText() {
    if (null === this.picked) {
      this.pickOne()
    }
    return this.picked['text']
  }
  
  log(msg) {
    console.log(msg)
  }
}

