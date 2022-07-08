# fxhash-features-manager

This is a handy tool to manage the features while developing p5js generative art projects for fxhash.xyz with [fxhash-webpack-boilerplate](https://github.com/fxhash/fxhash-webpack-boilerplate)

## Setup
Just copy and paste the classes if the `src.js` file to the `sketch.js`. (I know it not a modern implementation, and I'll do some improvement for this while I get more familiar to setting up a js module, or someone contributes his/her commits)

## Usage of class `FxhashFeature`: 

### Basic
Add some options for one feature:
```
let featureA = new FxhashFeature('Feature name')
let optionProbability1 = 0.6
let optionProbability2 = 0.4
featureA
  .addOption('Option Name 1', 'Option Value 1', optionProbability1)
  .addOption('Option Name 2', 'Option Value 2', optionProbability2)
```
Then call `.getValue()` whenever you want, it will call `fxrand()` behind to get a random value within the options for the feature:

```
let featureValue = featureA.getValue()
```
> Note: if the sum of the probabilities is not equal to 1, it will trigger a warning with `console.log()`

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
Add the features to the instance of `FxhashFeaturesManger`, and simply call `.output()` to dump the features for `window.$fxhashFeatures`:
```
let featuresManager.output = new FxhashFeaturesManger()
featuresManager.output
  .addFeature(featureA)
  .addFeature(featureB)

window.$fxhashFeatures = featuresManager.output.output()
```
> It will trigger a warning if the input of `.addFeature()` is not an instance of `FxhashFeature`

## Example

```
// set treeColor feature
let treeColor = new FxhashFeature('Tree Color')
treeColor
  .addOption('Black', '#202020', 0.2)
  .addOption('Brown', '#3B3028', 0.2)
  .addOption('Gray', '#5F636A', 0.2)
  .addOption('Blue Sapphire', '#19647E', 0.2)
  .addOption('Dark Green', '#607466', 0.2)

// set treeNumber feature
let treeNumber = new FxhashFeature('Tree Number')
for (let i = 0; i < 10; i++) {
    treeNumber.addOption(i, i, 0.1)
}

// add above features to the manager
let featuresManager = new FxhashFeaturesManger()
featuresManager
  .addFeature(treeColor)
  .addFeature(treeNumber)

window.$fxhashFeatures = featuresManager.output()
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
