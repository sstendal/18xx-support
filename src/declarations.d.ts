declare module "*.css" {
    const classNames: { [className: string]: string }
    export = classNames
}

declare module '*.scss'

declare module "*.svg" {
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    const src: string
    export default src
}

declare module "*.png"
declare module "*.jpg"

