using BookListRazor.Model;
using Microsoft.AspNetCore.Mvc;
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
        private readonly ApplicationDbContext _db;
        public BookController(ApplicationDbContext db)
        {
            _db = db;
        }
        [HttpGet] // Type of Request 
        public IActionResult GetAll()
        {
            return Json(new { data=_db.Book.ToList() }); // return Json Data by fetching it from Database table Book.
        }
    }
}
