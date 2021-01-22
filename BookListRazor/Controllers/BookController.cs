using BookListRazor.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookListRazor.Controllers
{
    [Route("api/Book")] // route to call API
    [ApiController] // To make sure Book Controller is an API controller
    public class BookController : Controller
    {
        private readonly ApplicationDbContext _db; // DBContext Dependancy Injection
        public BookController(ApplicationDbContext db)
        {
            _db = db; // get object of dependancy ApplicationDbContext
        }
        [HttpGet] // Type of Request 
        public async Task<IActionResult> GetAll() // async with Task and await for threading
        {
            return Json(new { data = await _db.Book.ToListAsync() }); // return Json Data by fetching it from Database table Book.
        }

        [HttpDelete] // To Delete Record 
        public async Task<IActionResult> Delete(int id) // Delete API with Parameter 
        {
            var bookFromDb = await _db.Book.FirstOrDefaultAsync(u => u.Id == id); // get record from table using Id
            if (bookFromDb == null)
            {
                return Json(new { success = false, message = "Error while Deleting" }); // If find null return false
            }
            else
            {
                _db.Book.Remove(bookFromDb); // If book find Remove it from Book
                await _db.SaveChangesAsync(); // and Save all changes in DB
                return Json(new { success = true, message = "Successfully Deleted." }); // Return Success True with message 
            }

        }
    }
}
