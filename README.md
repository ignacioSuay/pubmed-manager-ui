
#Pubmed Manager

## Debug with Web Storm

1. Unchecked "Build and launch application"

2. Choose bundle port 19001

3. Edit Start Reactive native bundler

3.1. Choose npm script

3.2 In the script field write: "android". You could also write here "start" and then choose the android or ios option.

4. You will need to run your simulator or device with JS debug enable

note: if you an error in the simulator like: "Cannot connect with the debugger", try to close all the chrome windows and debug again from webstorm

# Run the emulator from the command line

./Library/Android/sdk/emulator/emulator -list-avds

~/Library/Android/sdk/emulator/emulator @Pixel_XL_API_25

 ~/Android/Sdk/emulator/emulator -list-avds
 ~/Android/Sdk/emulator/emulator @Pixel_XL_API_28

