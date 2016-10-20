export default $sce => {
    (value, type) => {
        $sce.trustAs(type || 'html', value);
    }
}
