class FxhashFeaturesManager {
  constructor() {
    this.features = {}
  }

  addFeature(feature) {
    if (!(feature instanceof FxhashFeature)) {
      throw new TypeError('parameter #1 of addFeature() needs to be an instance of "Feature"')
    }
    this.features[feature.name] = feature
    return this
  }

  getFeatureText(name) {
    if (undefined === this.features[name]) {
      throw new Error('feature "' + name + '" not found.')
    }
    return this.features[name].getText()
  }

  getFeatureValue(name) {
    if (undefined === this.features[name]) {
      throw new Error('feature "' + name + '" not found.')
    }
    return this.features[name].getValue()
  }

  output() {
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
    this.options = {}
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
    this.debugging = this.options[text]
    if (this.debugging !== undefined) {
      this.log('Debugging: "' + this.name + '" is "' + this.getText() + '"')
    } else {
      this.log('Debugging: "' + this.name + '" has no option named "' + text + '"')
    }
  }

  pickOne() {
    if (this.picked !== null) {
      return
    }

    // run once even while debugging
    let rand = this.random()

    if (undefined !== this.debugging) {
      this.picked = this.debugging
      return
    }

    this.assignRates()

    // check if the sum of the rates is 100%
    if (!this.checkRates()) {
      this.log('Warning: the sum of the rates of all options of "' + this.name + '" is not 100%')
    }

    let cumm = 0
    for (let text in this.options) {
      cumm += this.options[text]['rate']
      if (rand < cumm) {
        this.picked = this.options[text]
        return
      }
    }
  }

  assignRates() {
    let quota = 1
    let noRateIndices = []

    // minus assigned rate from 1
    for (let i in this.options) {
      if (undefined !== this.options[i]['rate']) {
        quota -= this.options[i]['rate']
      } else {
        noRateIndices.push(i)
      }
    }

    // all options have been assigned own rates
    if (0 === noRateIndices.length) {
      return
    }

    // no less than 0
    quota = max(quota, 0)

    // calculate average of the left quota
    const rate = quota / noRateIndices.length

    // assign the average number for the unassigned options
    for (let j in noRateIndices) {
      let i = noRateIndices[j]
      this.options[i]['rate'] = rate
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
    return utils.fxr()
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
