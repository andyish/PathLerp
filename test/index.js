
import Path from '../index';
import { expect } from 'chai';

function makeCord(x, y) {
    return {
        x: x, y: y
    };
}

describe('Path lerp', () => {

    describe('lerp', () => {

        it('should return start of path when delta is 0.0', () => {
            let path = new Path([makeCord(0, 0), makeCord(1, 1)]);

            let result = path.lerp(0.0);
            expect(result.x).to.equal(0);
            expect(result.y).to.equal(0);
        });

        it('should return start of path when delta is less than 0.0', () => {
            let path = new Path([makeCord(0, 0), makeCord(1, 1)]);

            let result = path.lerp(-1.0);
            expect(result.x).to.equal(0);
            expect(result.y).to.equal(0);
        });

        it('should return end of path when delta is 1.0', () => {
            let path = new Path([makeCord(0, 0), makeCord(1, 1)]);

            let result = path.lerp(1.0);
            expect(result.x).to.equal(1);
            expect(result.y).to.equal(1);
        });

        it('should return end of path when delta is greater than 1.0', () => {
            let path = new Path([makeCord(0, 0), makeCord(1, 1)]);

            let result = path.lerp(10.0);
            expect(result.x).to.equal(1);
            expect(result.y).to.equal(1);
        });

        it('should return midpoint of path when delta is 0.5', () => {
            let path = new Path([makeCord(0, 0), makeCord(1, 1), makeCord(2, 2)]);

            let result = path.lerp(0.5);
            expect(result.x).to.equal(1);
            expect(result.y).to.equal(1);
        });

        it('should return 1/4 point of path when delta is 0.25', () => {
            let path = new Path([makeCord(0, 0), makeCord(1, 1), makeCord(2, 2), makeCord(3, 3)]);

            let result = path.lerp(0.25);
            expect(result.x).to.equal(0.75);
            expect(result.y).to.equal(0.75);
        });

        it('should return half way when delta is 0.5', () => {
            let path = new Path([makeCord(0, 0), makeCord(1, 1), makeCord(2, 2), makeCord(3, 3)]);

            let result = path.lerp(0.5);
            expect(result.x).to.equal(1.5);
            expect(result.y).to.equal(1.5);
        });

        it('should return 3/4 way when delta is 0.75', () => {
            let path = new Path([makeCord(0, 0), makeCord(1, 1), makeCord(2, 2), makeCord(3, 3)]);

            let result = path.lerp(0.75);
            expect(result.x).to.equal(2.25);
            expect(result.y).to.equal(2.25);
        });
    });

    describe('should', () => {

        it('should return path length of 1', () => {
            let path = new Path([makeCord(0, 0), makeCord(1, 0)]);

            expect(path.length).to.equal(1);
        });
    });

    describe('round', () => {

        it('should return 1.12 given 1.116 with cacheSensitivity of 2', () => {
            let path = new Path([makeCord(0, 0), makeCord(1, 0)], {
                cacheEnabled: true,
                cacheSensitivity: 2
            });

            expect(path.round(1.116)).to.equal(1.12);
        });

        it('should return 1.11 given 1.111 with cacheSensitivity of 2', () => {
            let path = new Path([makeCord(0, 0), makeCord(1, 0)], {
                cacheEnabled: true,
                cacheSensitivity: 2
            });

            expect(path.round(1.111)).to.equal(1.11);
        });

        it('should return 1.55556 given 1.55555555555 with cacheSensitivity of 5', () => {
            let path = new Path([makeCord(0, 0), makeCord(1, 0)], {
                cacheEnabled: true,
                cacheSensitivity: 5
            });

            expect(path.round(1.55555555555)).to.equal(1.55556);
        });

        it('should return 1.1 given 1.1 with cacheSensitivity of 6', () => {
            let path = new Path([makeCord(0, 0), makeCord(1, 0)], {
                cacheEnabled: true,
                cacheSensitivity: 6
            });

            expect(path.round(1.1)).to.equal(1.1);
        });
    });
});
