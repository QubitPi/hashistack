# Copyright Jiaqi Liu
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#!/bin/bash

: <<'END'
Adds white paddings of an image to make it a square image.

For example:

convert -size 400x400 xc:white input.png -gravity northwest -composite output.png

To use this script, install ImageMagick first. For example, on Mac, install by

    brew update
    brew install imagemagick

To install this script, place it under OS executable path. For example, On mac put this under "/usr/local/bin/"

The usage of this script, run

    add-white-padding.sh \
        <absolute path(including name) of the image to be white-padded> \
        <absolute path(including name) of the white-padded image>

A file named "favicon.ico" will be generated in the current directory where shell command is issued.
END

set -e # abort script if any command fails

# get the width and height of the image
# -ping option prevents the entire image from being loaded to memory
width=$(identify -ping -format '%w %h' $1 | awk '{print $1}')
height=$(identify -ping -format '%w %h' $1 | awk '{print $2}')

width=$(($width+0))
height=$(($height+0))

echo "width=$width"
echo "height=$height"


# select the larger dimension as the side length of the output square image
if [[ $(( $width - $height )) > 0 ]]; then
  echo "width=$width>height=$height"
  side=$width
else
  echo "height=$height>=width=$width"
  side=$height
fi

echo "side=$side"

output_dimension="${side}x${side}"

# add padding
convert -size $output_dimension xc:white $1 -gravity center -composite $2