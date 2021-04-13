using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.models
{
    public class TodoItem
    {
        private long id;

        public long Id { get => id; set => id = value; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }

        public string Secret { get; set; }

    }
}
