# fxhash-features-manager

This is a handy tool to manage the features while developing p5js generative art projects for fxhash.xyz with [fxhash-webpack-boilerplate](https://github.com/fxhash/fxhash-webpack-boilerplate)

## Setup
Download `src.js` as `ffm.src.js` or other names, then load it in `<head>`:
```
<script src="ffm.src.js" type="text/javascript"></script>
```

## Usage of class `FxhashFeature`: 

### Basic
Add some options for one feature:
```
let featureA = new FxhashFeature('Feature name')
let optionProbability1 = 0.1
let optionProbability2 = 0.2
featureA
  .addOption('Option Name 1', 'Option Value 1', optionProbability1)
  .addOption('Option Name 2', 'Option Value 2', optionProbability2)
  .addOption('Option Name 3', 'Option Value 3')
  .addOption('Option Name 4', 'Option Value 4')
```
Then call `.getValue()` whenever you want, it will call `fxrand()` behind to get a random value within the options for the feature:

```
let featureValue = featureA.getValue()
```
You can also use `FxhashFeaturesManager.getFeatureValue()` to get features' values without obtaining multiple `FxhashFeature` objects, which is the recommended pratice (see below).

> Note:
> 1. it will automatically assign probabilities for the options without a value. The value will be the average of 1 minus the sum of all assigned probabilities. In the code snippet above, option 3 & 4 will be assigned for `(1 - 0.1 - 0.2) / 2 = 0.35` each.
> 2. if the sum of all probabilities is not equal to 1, it will trigger a warning with `console.log()`

### Debug
You can force to assign an option by its name to the feature through `.debug()`:
```
let featureA = new FxhashFeature('Feature name')
let optionProbability1 = 0.6
let optionProbability2 = 0.4
featureA
  .addOption('Option Name 1', 'Option Value 1', optionProbability1)
  .addOption('Option Name 2', 'Option Value 2', optionProbability2)
  .debug('Option Name 2')
```
It will trigger some log through `console.log` to inform you the feature is in debugging now:
```
Debugging: "Feature name" is "Option Name 2".
```

> If `.debug()` is applied, it  will NOT trigger the checking for the sum of the probabilities

## Usage of class `FxhashFeaturesManger`:

### Add features to the manager
Add the features to the instance of `FxhashFeaturesManger`:
```
let featuresManager.output = new FxhashFeaturesManger()
featuresManager.output
  .addFeature(featureA)
  .addFeature(featureB)
```

### Get a feature's value
Call `getFeatureValue()` to get specific feature's value by its name:
```
let featureValue = featuresManager.getFeatureValue('Feature name')
```

### Dump features information for publishing on fxhash
simply call `.output()` to dump the features for `window.$fxhashFeatures`
```
window.$fxhashFeatures = featuresManager.output()
```
> It will trigger a `TypeError` if the input of `.addFeature()` is not an instance of `FxhashFeature`

## Example

```
// set all the features in this function, and return a manager object
function getFeaturesManager() {
  // set treeColor feature
  let treeColor = new FxhashFeature('Tree Color')
  treeColor
    .addOption('Black', '#202020', 0.03)  // rare option with a low probability
    .addOption('Brown', '#3B3028')
    .addOption('Gray', '#5F636A')
    .addOption('Blue Sapphire', '#19647E')
    .addOption('Dark Green', '#607466')

  // set treeNumber feature
  let treeNumber = new FxhashFeature('Tree Number')
  for (let i = 0; i < 10; i++) {
    treeNumber.addOption(i, i)  // equal probabilities for every option
  }
    
  // add above features to the manager
  let featuresManager = new FxhashFeaturesManger()
  featuresManager
    .addFeature(treeColor)
    .addFeature(treeNumber)

  return featuresManager
}

// obtain the manager object
let fm = getFeaturesManager()

// get features' values in you code whenever you need
let color = fm.getFeatureValue('Tree Color')
let number = fm.getFeatureValue('Tree Number')

// dump features information for publishing on fxhash.xyz
window.$fxhashFeatures = fm.output()
```
The output may be like:
```
{
  "Tree Color": "Black",
  "Tree Number": 4
}
```
That's it!

## Note
Because I'm not so familiar to modern way to setup a javascript package, so feel free to contribute your commits to improve this tool if you like to.

Enjoy creative coding!
