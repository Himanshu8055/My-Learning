const fs = require('fs');

function generateM3U8(playlistName, segmentFiles, targetDuration = 10) {
    const m3u8Content = [
        '#EXTM3U',
        '#EXT-X-VERSION:3',
        `#EXT-X-TARGETDURATION:${targetDuration}`,
        '#EXT-X-MEDIA-SEQUENCE:0'
    ];

    segmentFiles.forEach((file, index) => {
        m3u8Content.push(`#EXTINF:${targetDuration},`);
        m3u8Content.push(file);
    });

    m3u8Content.push('#EXT-X-ENDLIST');

    fs.writeFileSync(playlistName, m3u8Content.join('\n'));
    console.log(`M3U8 playlist '${playlistName}' generated successfully.`);
}

// Example usage
const segmentFiles = [
    'segment1.ts',
    'segment2.ts',
    'segment3.ts'
];

generateM3U8('https://tera.backend.live/file/2d1b715275a3fa495beb940dd6e66664.m3u8', segmentFiles);
