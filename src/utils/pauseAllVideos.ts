export const pauseAllVideos = () => {
    document.querySelectorAll("video").forEach(node => {
        node.pause();
    });
};
