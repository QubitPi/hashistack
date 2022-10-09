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
Create `.ico` file from image using ImageMagick

To use this script, install ImageMagick first. For example, on Mac, use

    brew update
    brew install imagemagick

To install this script, place it under OS executable path. For example, On mac put this under "/usr/local/bin/"

The usage of this script:

    convert-to-favicon.sh <absolute path(including name) of the image to be convertd to a favicon>

A file named "favicon.ico" will be generated in the current directory where shell command is issued.
END

set -e # abort script if any command fails

convert $1 -bordercolor white -border 0 \
      \( -clone 0 -resize 16x16 \) \
      \( -clone 0 -resize 32x32 \) \
      \( -clone 0 -resize 48x48 \) \
      \( -clone 0 -resize 64x64 \) \
      -delete 0 -alpha off -colors 256 favicon.ico
