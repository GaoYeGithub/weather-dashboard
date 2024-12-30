export const formatTime = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true
    });
};

