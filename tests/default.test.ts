import {StringBlockChain} from '../StringBlockChain';

describe("Hello function", () => {
    it('test', () => {
        let blockChain: StringBlockChain = new StringBlockChain();
        blockChain.add('500USD', new Date(Date.parse('2019-05-22 12:40:00')));
        blockChain.add('100USD', new Date(Date.parse('2019-05-22 09:40:00')));
        expect(blockChain.transactions[0].data).toBe('500USD');
        expect(blockChain.transactions[1].data).toBe('100USD');
        expect(blockChain.check()).toBe(true);
        blockChain.transactions[0].hash = 'unknown';
        expect(blockChain.check()).toBe(false);
    });
    it('test', () => {
        let blockChain: StringBlockChain = new StringBlockChain();
        blockChain.add('500USD', new Date(Date.parse('2019-05-22 12:40:00')));
        blockChain.add('100USD', new Date(Date.parse('2019-05-22 09:40:00')));
        expect(blockChain.toString()).toMatch(/^([\da-z]+)\|DSU005\|(\d+)\n([\da-z]+)\|DSU001\|(\d+)$/i);
        expect(blockChain.toString()).toBe("48ad43e5d230f64e7fbd9285c3da61579b0766982c124bec9907d8356b3c0e6c|DSU005|1558507200000\n7dceb632f978adc3483d4ecba7f064c19f68811156515d2f90ee162741f49eaf|DSU001|1558496400000");

        expect(blockChain.transactions[0].toString()).toBe('48ad43e5d230f64e7fbd9285c3da61579b0766982c124bec9907d8356b3c0e6c|DSU005|1558507200000');
        expect(blockChain.transactions[1].toString()).toBe('7dceb632f978adc3483d4ecba7f064c19f68811156515d2f90ee162741f49eaf|DSU001|1558496400000');
    });
});
