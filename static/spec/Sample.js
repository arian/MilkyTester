
define(function(){
	
	describe('Calculations', function(){
	
		describe("Some simple equations", function(){
	
			it('should sum two numbers', function(){
			
				expect(1 + 3).toBe(3);
				expect(1 + 3).toBe(4);

			});
		
			it('should use the times operator', function(){
				expect(4 * 3).toBe(12);
			});
	
		});

		describe('Some more complicated equations', function(){
			it('should do a square root', function(){
				expect(Math.sqrt(4)).toBe(2);
			});
		});
	
	});

});

