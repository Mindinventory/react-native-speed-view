# react-native-speed-view

It will show speedometer.

Here's projection of this component in GIF format.

![Simulator Screen Recording - iPhone 11 - 2022-04-20 at 12 59 09](https://user-images.githubusercontent.com/82019401/164174514-2369be99-a00a-4171-a47d-95b997388bbe.gif)




# Component props
| prop | value  | required/optional | Description
| ------    | ------ | ------ | ------ |
| percentage | _number_ | required | Default value `85` |
| maxPercentage | _number_ | optional | Default value `100` |
| gradientColorStart | _GradientColor_ | optional | GradientColor interface has two parameter `color` & `Opacity`|
| gradientColorEnd | _GradientColor_ | optional | GradientColor interface has two parameter `color` & `Opacity`|
| showProgress | _boolean_ | optional | Default value `true` |
| enableBounceEffect | _boolean_ | optional | Default value `true` |
| progressFormatSign | _string_ | optional | Allow user to set formate of progress text formate to change. |

## To Run example

```sh
Goto example directory and install all packages that requires.

cd example && yarn

Pod Installation: cd example && cd ios && pod install && cd ..

To Run: yan ios
```

## Dependencies

- `react-native-svg`

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License
react-native-speed-view  is [MIT-licensed](https://github.com/Mindinventory/react-native-speed-view/blob/main/LICENSE)..

MIT
