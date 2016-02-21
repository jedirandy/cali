import * as gali from '../src/function';
describe('Functions tests', () => {
    it('identity', () => {
        let obj = {};
        expect(gali.identity(obj)).to.equal(obj);
    });

    it('curry a zero argument function returns that function', () => {
        let f = () => 1;
        expect(gali.curry(f)).to.equal(f);
    });

    it('curry a function', () => {
        let sum3 = gali.curry((a, b, c) => a + b + c);
        expect(sum3()).to.be.a('function');
        expect(sum3(1)).to.be.a('function');
        expect(sum3(1, 2)).to.be.a('function');
        expect(sum3()(1)(2)(3)).to.equal(6);
        expect(sum3(1)(2)(3)).to.equal(6);
        expect(sum3(1,2)(3)).to.equal(6);
        expect(sum3(1,2,3)).to.equal(6);
    });

    it('compose multiple functions', () => {
        let composed = gali.compose(
            a => a * a,
            a => a * 2,
            a => a + 1
        );
        expect(composed(1)).to.equal(16);
    });

    it('automatically curried map', () => {
        expect(gali.map(a => a * 2, [1,2,3])).to.deep.equal([2,4,6]);
        expect(gali.map(a => a * 2)([1,2,3])).to.deep.equal([2,4,6]);
    });
});