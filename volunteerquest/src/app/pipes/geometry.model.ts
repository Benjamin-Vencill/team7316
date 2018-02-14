export interface Coordinate {
    lat: number,
    lng: number
}

export interface BBox {
    topleft: Coordinate,
    bottomright: Coordinate
}