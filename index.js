
export default class Path {

    /**
     * List cordinates that make up the desired path
     * @constructor
     * @param {Object[]} cordinates - list of cordinates
     * @param {number} cordinates.x - cordinates x axis
     * @param {number} cordinates.y - cordinates y axis
     * @param {Object} options - options
     * @param {boolean} options.cacheEnabled - enable caching of lerp values
     * @param {number} options.lerpSensitivity - min of 2
     */
	constructor (cordinates, options) {
        this._vertexes = Path.BuildVertexes(cordinates);
        this.length = Path.CalculateLength(cordinates);

        if(options) {
            this.cacheEnabled = options.cacheEnabled || false;
            this.cacheSensitivity = options.cacheSensitivity || 3;
        }
	}

    /**
     * Given a value between 0.0 and 1.0 returns the position on the path.
     *  Where 0.0 is the start and 1.0 is the end.
     * @param alpha {number} alpha - value between 0.0 and 1.0
     */
	lerp(alpha) {

        if(this.cacheEnabled) {
            alpha = this.round(alpha);
        }

		let lastVertex = this._vertexes[0];

		if (alpha <= 0.0) {
			return {
				x: lastVertex.x,
				y: lastVertex.y
			};
		}
        if (alpha >= 1.0) {
            const retVal = {
                x: this._vertexes[this._vertexes.length - 1].x,
                y: this._vertexes[this._vertexes.length - 1].y
            };
            return retVal;
        }

		alpha = Math.min(alpha, 1.0);

		const dist = alpha * this.length;

		for (let i = 1; i < this._vertexes.length; i++) {
			const currentVertex = this._vertexes[i];
			if (dist >= lastVertex.start && dist <= currentVertex.start) {
				const lerp = (dist - lastVertex.start) / (currentVertex.start - lastVertex.start);
				return {
					x: (currentVertex.x - lastVertex.x) * lerp + lastVertex.x,
					y: (currentVertex.y - lastVertex.y) * lerp + lastVertex.y
				};
			}
			lastVertex = currentVertex;
		}

        // catch-all
		return {
			x: lastVertex.x,
			y: lastVertex.y
		};
	}

    round(value) {
        const multi = Math.pow(10, this.cacheSensitivity);
        value = Math.round(value * multi) / multi;

        return value;
    }

    static CalculateLength(vertexes) {

        let length = 0.0;

        for (let i = 0; i < vertexes.length; i++) {
			if (i < vertexes.length - 1) {
                const currentVertex = vertexes[i];
                const nextCordinate = vertexes[i + 1];
				const dx = nextCordinate.x - currentVertex.x;
				const dy = nextCordinate.y - currentVertex.y;

				length += Math.sqrt(dx * dx + dy * dy);
			}
        }

        return length;
    }

    static BuildVertexes(cordinates) {
        let vertexes = [];
        let length = 0.0;

        for (let i = 0; i < cordinates.length; i++) {

            const cordinate = cordinates[i];
			let segmentLength = 0.0;
			let start = 0.0;

			if (i < cordinates.length - 1) {
                const nextCordinate = cordinates[i + 1];
				const dx = nextCordinate.x - cordinate.x;
				const dy = nextCordinate.y - cordinate.y;

				segmentLength = Math.sqrt(dx * dx + dy * dy);
				start = length;
				length += segmentLength;
			}
			else {
				segmentLength = 0.0;
				start = length;
			}

			vertexes.push({
                x: cordinate.x,
                y: cordinate.y,
                start: start,
                length: segmentLength
            });
		}

        return vertexes;
    }
}
