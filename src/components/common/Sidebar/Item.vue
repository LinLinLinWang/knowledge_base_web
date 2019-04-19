<script>
    export default {
        name: 'MenuItem',
        functional: true,
        props: {
            icon: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            }
        },
        render(h, context) {
            const {icon, title} = context.props;
            const vnodes = [];

            // console.log(icon);

            if (icon) {
                let si =
            <
                svg - icon
                icon - class = {icon}
                />;
                vnodes.push(si);
            }

            if (title) {
                vnodes.push(<span slot='title'>{(title)}</span>)
            }

            // console.log("vnodes:");
            console.log( < svg - icon
            icon - class = {icon}
            />);
            // console.log("end");

            return vnodes
        }
    }
</script>
