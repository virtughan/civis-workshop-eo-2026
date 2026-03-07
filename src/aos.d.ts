declare module "aos" {
    interface AOSOptions {
        duration?: number;
        once?: boolean;
        offset?: number;
        easing?: string;
    }
    function init(options?: AOSOptions): void;
    function refresh(): void;
    export default { init, refresh };
}
