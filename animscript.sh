#!/bin/bash
mkdir -p out out2 out3
ffmpeg -i input.mp4 out/out%04d.png
for file in out/*.png; do
    filename=$(basename "$file")
    tcolor=magenta
    convert \
        "$file" \
        -fuzz '5%' -trim \
        -gravity west -extent 262x400 \
        -bordercolor white -border 1x1 \
        -fuzz '5%' -fill $tcolor -draw 'color 0,0 floodfill' \
        -transparent $tcolor \
        "out2/$filename"
done
for num in `seq -w 0034 0066`; do
    cp "out2/output_$num.png" "out3/output_$num.png"
done
ffmpeg \
    -framerate 30 -pattern_type glob -i 'out3/*.png' \
    -filter_complex "palettegen=reserve_transparent=on:transparency_color=0xff00ff" \
    -y palette.png &&
ffmpeg \
    -framerate 30 -pattern_type glob -i 'out3/*.png' \
    -i palette.png -lavfi "paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" \
    -y walk.gif