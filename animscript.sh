#!/bin/bash
mkdir -p out out2 out3
ffmpeg -i input.mp4 out/out%04d.png
for file in out/*.png; do
    filename=$(basename "$file")
    tcolor=none
    convert \
        "$file" \
        -fuzz '5%' -trim -transparent 'rgb(251,253,250)' \
        -bordercolor $tcolor -border 1x1 \
        -fuzz '5%' -fill $tcolor -draw 'color 0,0 floodfill' \
        -gravity west -extent 262x400 \
        "out2/$filename"
done
ffmpeg \
    -framerate 30 -pattern_type glob -i 'out3/*.png' \
    -filter_complex "palettegen=reserve_transparent=on:transparency_color=0xfcfdfa" \
    -y palette.png &&
ffmpeg \
    -framerate 30 -pattern_type glob -i 'out3/*.png' \
    -i palette.png -lavfi "paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" \
    -y output.gif