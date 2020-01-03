// 创建纹理。
var gl;
var texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

const faceInfos = [
    {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
        url: '/img/sorbin_rt.jpg',
    },
    {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
        url: '/img/sorbin_lf.jpg',
    },
    {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
        url: '/img/sorbin_up.jpg',
    },
    {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
        url: '/img/sorbin_dn.jpg',
    },
    {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
        url: '/img/sorbin_bk.jpg',
    },
    {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
        url: '/img/sorbin_ft.jpg',
    },
];
faceInfos.forEach((faceInfo) => {
    const { target, url } = faceInfo;
    // 上传画布到立方体贴图的每个面
    const level = 0;
    const format = gl.RGBA;
    const width = 512;
    const height = 512;
    const type = gl.UNSIGNED_BYTE;
    // 设置每个面，使其立即可渲染
    gl.texImage2D(target, level, format, width, height, 0, format, type, null);

    // 异步加载图片
    const image = new Image();
    image.src = url;
    image.onload = function () {
        // 图片加载完成将其拷贝到纹理
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        gl.texImage2D(target, level, internalFormat, format, type, image);
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    };
});
gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);